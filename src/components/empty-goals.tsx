import logo from "../assets/logo-in-orbit.svg";
import letsStart from "../assets/lets-start.svg";
import { Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo dosite" />
      <img src={letsStart} alt="lets start do site" />
      <p className="text-zinc-500 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
