import Chip from "./components/Chip";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { IUser } from "./types/user";
import { initialData } from "./constant/users";

const App = () => {
  const [selected, setSelected] = useState<IUser[]>([]);
  const [usersList, setUsersList] = useState<IUser[]>(initialData);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        ref.current?.contains(event.target) &&
        dropDownRef.current
      ) {
        dropDownRef.current.style.visibility = "visible";
      } else if (
        dropDownRef.current &&
        !dropDownRef.current?.contains(event.target)
      ) {
        dropDownRef.current.style.visibility = "hidden";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleAdd = (user: IUser) => {
    const updatedUsers = [...selected, user];
    const updatedUsersList = usersList.filter((u) => u.email !== user.email);

    setUsersList(updatedUsersList);
    setSelected(updatedUsers);
  };

  const handleRemove = (user: IUser) => {
    const updatedUsers = selected.filter((data) => data.email !== user.email);
    const updatedUsersList = [...usersList, user];

    setUsersList(updatedUsersList);
    setSelected(updatedUsers);
  };

  return (
    <>
      <p className="text-center text-3xl mt-8">Pick Users</p>
      <div className="flex justify-center">
        <div className="border-b-2 min-w-96 flex p-2 m-8 relative border-black">
          <div className="flex gap-1 mr-2">
            {selected?.map((user) => (
              <Chip key={user.email} user={user} handleRemove={handleRemove} />
            ))}
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="outline-none flex-1"
            ref={ref}
            placeholder="Add new user.."
          />
          <div
            ref={dropDownRef}
            className="drop-down absolute top-16 invisible z-10 bg-white shadow-md"
          >
            {usersList
              .filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
              )
              ?.map((person) => (
                <div
                  onClick={() => handleAdd(person)}
                  key={person.email}
                  className="my-2 flex hover:bg-slate-200 cursor-pointer p-2 justify-between w-full items-center"
                >
                  <div className="flex  items-center">
                    <img className="w-8 rounded-full" src={person.avatar} />
                    <p className="ml-2 text-base">{person.name}</p>
                  </div>
                  <p className="ml-4 text-sm text-slate-500">{person.email}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
