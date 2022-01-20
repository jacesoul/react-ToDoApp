import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((prevToDos) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...prevToDos,
    ]);
    setValue("toDo", "");
  };

  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        ></input>
        <button>Add ToDo</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;

/*
interface IForm {
  Email: string;
  firstName: string;
  lastName: string;
  Password: string;
  passwordConfirmation: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: { Email: "@naver.com" },
  });
  const onValid = (data: IForm) => {
    if (data.Password !== data.passwordConfirmation) {
      setError(
        "passwordConfirmation",
        {
          message: "Password are not the same",
        },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails  allowed",
            },
          })}
          placeholder="Email"
        ></input>
        <span>{errors?.Email?.message}</span>
        <input
          {...register("firstName", {
            required: "Your first name is required",
            validate: {
              noJace: (value) =>
                value.includes("jace") ? "no jace allowed" : true,
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
            },
            minLength: { value: 5, message: "Your first name is too short" },
          })}
          placeholder="First Name"
        ></input>
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: "Your last name is required",
            minLength: { value: 5, message: "Your last name is too short" },
          })}
          placeholder="Last Name"
        ></input>
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("Password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password"
        ></input>
        <span>{errors?.Password?.message}</span>
        <input
          {...register("passwordConfirmation", {
            required: "Password Confirmation is required",
            minLength: {
              value: 5,
              message: "Your password confirmation is too short.",
            },
          })}
          placeholder="Password Confirmation"
        ></input>
        <span>{errors?.passwordConfirmation?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
*/