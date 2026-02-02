export default function EditUserPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit User</h1>
            <p>Editing User ID: {params.id}</p>
            {/* Edit user form will be displayed here */}
        </div>
    );
}
