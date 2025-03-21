const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-[10vw] bg-gray-900 text-white shadow-lg flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6">Menú</h2>
            <ul className="space-y-4">
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Opción 1</li>
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Opción 2</li>
                <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Opción 3</li>
            </ul>
        </div>
    );
};

export default Sidebar;
