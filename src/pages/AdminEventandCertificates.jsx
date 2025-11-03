import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import EventCards from "../components/EventCards";
import bgLogo from "../assets/life_saver_kust_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../api/eventApi";

const AdminEventandCertificates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEventsPage = location.pathname === "/adminevents&certificates";
  const isCertificatesPage = location.pathname === "/admincertificates";

  const [events, setEvents] = useState([]);

  const adminRole = (localStorage.getItem("adminRole") || "").trim();

  const isSuperAdmin = adminRole === "superAdmin";

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    headerImage: null,
    galleryImages: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        console.log("fetched events", res);
        if (res && Array.isArray(res)) {
          setEvents(res);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // --- Add Event ---
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("date", newEvent.date);
    formData.append("description", newEvent.description);

    if (newEvent.headerImage) {
      formData.append("header_image", newEvent.headerImage);
    }

    newEvent.galleryImages.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const res = await createEvent(formData);
      alert("✅ Event added successfully!");
      setShowModal(false);
      resetForm();
      const updated = await getAllEvents();
      setEvents(updated);
    } catch (error) {
      console.error("❌ Add event error:", err);
      alert(err.message || "Failed to add event");
    }
  };

  // --- Delete Event ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;
    try {
      await deleteEvent(id);
      alert("Event deleted successfully");
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (error) {
      console.error("❌ Error deleting event:", error);
      alert(error.message || "Failed to delete event");
    }
  };

  // --- Edit Event ---
  const handleEditClick = (event) => {
    setIsEditing(true);
    setCurrentEventId(event._id);

    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
      headerImage: null,
      galleryImages: [],
    });
    setShowModal(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await updateEvent(currentEventId, {
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
      });
      alert("✅ Event updated successfully!");
      setShowModal(false);
      setIsEditing(false);
      setCurrentEventId(null);
      const updatedList = await getAllEvents();
      setEvents(updatedList);
      resetForm();
    } catch (error) {
      console.error("Error updating event:", error);
      alert(error.message || "Failed to update event");
    }
  };

  // --- Reset form helper ---
  const resetForm = () => {
    setNewEvent({
      title: "",
      date: "",
      description: "",
      headerImage: null,
      galleryImages: [],
    });
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-50 via-white to-red-100 overflow-y-auto">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[60%] md:w-[40%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base"
            >
              + Add Event
            </button>

            <button
              onClick={() => navigate("/adminevents&certificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isEventsPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigate("/admincertificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isCertificatesPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Certificates
            </button>
          </div>
        }
      />

      {/* Events Grid */}
      <div className="relative z-10 pt-24 px-6 md:px-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {events.map((event) => (
          <EventCards
            key={event._id}
            event={{
              ...event,
              image: event.header_image
                ? `http://localhost:4000/api${event.header_image}`
                : "https://placehold.co/600x400",
            }}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            isSuperAdmin={isSuperAdmin}
          />
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form
            onSubmit={isEditing ? handleUpdateEvent : handleAddEvent}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Event Title"
              required
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            {/* Date */}
            <input
              type="date"
              required
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            {/* Description */}
            <textarea
              placeholder="Full Description"
              required
              rows="4"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full resize-none"
            />

            {/* Only for Add */}
            {!isEditing && (
              <>
                <div className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Header Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        headerImage: e.target.files[0],
                      })
                    }
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Gallery Images (Up to 9)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files).slice(0, 9);
                      setNewEvent({ ...newEvent, galleryImages: files });
                    }}
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  resetForm(); // <-- reset on cancel
                }}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-lg hover:scale-105 transition-all"
              >
                {isEditing ? "Update Event" : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminEventandCertificates;
