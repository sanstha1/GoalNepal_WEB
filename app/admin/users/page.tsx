/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import CreateUserForm from "./_components/CreateUserForm";
import EditUserForm from "./_components/EditUserForm";
import { X, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
  role: string;
  createdAt: string;
}

export default function Page() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      const result = await response.json();
      if (result.success) {
        setUsers(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchUsers();
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        toast.success("User deleted successfully");
        setShowDeleteModal(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";
    return `${baseUrl}/profile_pictures/${imagePath.split("/").pop()}`;
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-white/50 mt-1">Manage platform users and accounts</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition"
          style={{
            background: "linear-gradient(135deg, #e05d2e, #d45a28)"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          Create User
        </motion.button>
      </motion.div>

      {loading ? (
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div style={{ animation: "spin 1s linear infinite", borderRadius: "50%", width: "48px", height: "48px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#e05d2e" }} />
        </motion.div>
      ) : (
        <motion.div
          className="rounded-xl border overflow-hidden shadow-lg"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderColor: "rgba(255,255,255,0.1)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <thead style={{ background: "rgba(255,255,255,0.02)" }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/70 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/70 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/70 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white/70 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                {users.map((user, idx) => (
                  <motion.tr
                    key={user._id}
                    className="hover:bg-white/5 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0">
                          {getImageUrl(user.profilePicture) ? (
                            <img
                              className="w-10 h-10 rounded-lg object-cover"
                              src={getImageUrl(user.profilePicture) || ""}
                              alt={user.fullName}
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                              style={{ background: "rgba(224, 93, 46, 0.2)", color: "#e05d2e" }}
                            >
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{user.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/70">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                        style={{
                          background: "rgba(224, 93, 46, 0.2)",
                          color: "#e05d2e"
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <motion.button
                          onClick={() => handleEditClick(user)}
                          className="p-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Pencil size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition text-red-400/70 hover:text-red-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <motion.div
                className="text-center py-12 text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>No users found</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="sticky top-0 p-6 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-2xl font-bold text-white">Create User</h2>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white/40 hover:text-white/60 transition"
                  whileHover={{ rotate: 90 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              <div className="p-6">
                <CreateUserForm onSuccess={handleCreateSuccess} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && selectedUser && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="sticky top-0 p-6 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <h2 className="text-2xl font-bold text-white">Edit User</h2>
                <motion.button
                  onClick={() => { setShowEditModal(false); setSelectedUser(null); }}
                  className="text-white/40 hover:text-white/60 transition"
                  whileHover={{ rotate: 90 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              <div className="p-6">
                <EditUserForm user={selectedUser} onSuccess={handleEditSuccess} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && selectedUser && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-md w-full relative"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={() => { setShowDeleteModal(false); setSelectedUser(null); }}
                className="absolute top-4 right-4 text-white/40 hover:text-white/60 transition"
                whileHover={{ rotate: 90 }}
              >
                <X size={24} />
              </motion.button>
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "2px solid rgba(239, 68, 68, 0.3)"
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Trash2 size={32} color="#ef4444" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-3">Delete User</h2>
                <p className="text-white/50 mb-8">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">{selectedUser.fullName}</span>?
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => { setShowDeleteModal(false); setSelectedUser(null); }}
                    className="flex-1 py-3 px-6 rounded-lg font-bold text-sm transition"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)"
                    }}
                    whileHover={{ background: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={confirmDelete}
                    className="flex-1 py-3 px-6 rounded-lg font-bold text-sm text-white transition"
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}