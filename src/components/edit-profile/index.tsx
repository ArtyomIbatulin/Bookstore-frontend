import { useContext, useState } from "react"
import type { User } from "../../app/types/userType"
import { ThemeContext } from "../theme-provider"
import { useEditUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext)
  const [editUser, { isLoading }] = useEditUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      login: user?.login,
      name: user?.name,
    },
  })

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.login &&
          data.login !== user?.login &&
          formData.append("login", data.login)
        data.name && formData.append("name", data.name)
        // data.dateOfBirth && formData.append('dateOfBirth' ,
        //   new Date(data.dateOfBirth).toISOString()
        // ) для даты рождения
        selectedFile && formData.append("avatar", selectedFile)

        await editUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foregroud`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onChange={handleSubmit(onSubmit)} // check!!! отправляет запрос на каждый ввод !!!
              >
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name="name" label="Имя" type="text" />
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выбери файл"
                  onChange={handleChangeFile}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
