import Clear from "../assets/icons/Clear";
import { IUser } from "../types/user";

interface IChip {
  user: IUser;
  handleRemove: (data: IUser  ) => void;
}

const Chip = ({ user, handleRemove }: IChip) => {
  return (
    <div className="flex items-center justify-between rounded-full bg-slate-300">
      <div className="rounded-full overflow-hidden w-8 h-8 mr-2">
        <img src={user.avatar} className="w-full h-full"/>
      </div>
      <div className="text-sm w-max">{user.name}</div>
      <div
        className="cursor-pointer flex items-center ml-2 mr-4"
        onClick={() => handleRemove(user)}
      >
        <Clear />
      </div>
    </div>
  );
};

export default Chip;
