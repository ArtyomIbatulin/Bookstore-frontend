import { useForm } from "react-hook-form"
import { Input } from "../components/input"
import { Button, Link } from "@nextui-org/react"

type Props = {
  setSelected: (value: string) => void
}
type LoginType = {
  login: string
  password: string
}

export const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      login: "",
      password: "",
    },
  })

  //const onSubmit

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="login"
        label="Логин"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />

      <p className="text-center text-small">
        Нет аккаунта?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Войти
        </Button>
      </div>
    </form>
  )
}
