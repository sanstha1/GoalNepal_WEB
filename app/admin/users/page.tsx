"use client";

import { useState } from "react";
import CreateUserForm from "./_components/CreateUserForm";
import { X } from "lucide-react";

export default function Page() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div>
            <button 
                onClick={() => setShowCreateModal(true)}
                className="text-white bg-black border border-black px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
                Create User
            </button>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New User</h1>
                        <CreateUserForm onSuccess={() => setShowCreateModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}