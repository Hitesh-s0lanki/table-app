import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModal } from "@/hooks/use-auth-model";
import LoginForm from "../auth/login-form";
import RegisterForm from "../auth/register-form";
import ResetForm from "../auth/reset-form";

const AuthModel = () => {
  const { isOpen, onClose, type } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="p-0">
        {type === "LOGIN" ? (
          <LoginForm />
        ) : type === "REGISTER" ? (
          <RegisterForm />
        ) : (
          <ResetForm />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModel;
