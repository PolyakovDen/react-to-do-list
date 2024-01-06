export default function Task({
  title = "",
  done = false,
  id = "",
  onChange = () => {},
  onDelete = () => {},
}: {
  title: string;
  done: boolean;
  id: string;
  onChange: (value: boolean) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <div className="border rounded-md py-2 px-4 my-2 flex items-center bg-white shadow-md w-[390px]">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => onChange(e.target.checked)}
          className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
        />
        <p
          className={`text-lg ml-4 ${
            done ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {title}
        </p>
        <span
          onClick={() => onDelete(id)}
          className="ml-auto text-red-500 cursor-pointer hover:text-red-700"
        >
          ❌
        </span>
      </div>
    </>
  );
}
