export default function UserDetailPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Details</h1>
            <p>User ID: {params.id}</p>
            {/* User details will be displayed here */}
        </div>
    );
}
