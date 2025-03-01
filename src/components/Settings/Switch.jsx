export default function CustomSwitch({ enabled, onToggle }) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300"
        style={{ backgroundColor: enabled ? "var(--primary-purple-color)" : "#ccc" }}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
            enabled ? "translate-x-6" : ""
          }`}
        ></div>
      </div>
    );
  }