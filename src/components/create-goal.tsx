import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  title: z.string().min(1, "Informe a atividade"),
  desireWeeklyFrequency: z.coerce
    .number({ message: "Informe a frequencia" })
    .min(1)
    .max(7),
});
type CreateGoalForm = z.infer<typeof schema>;

export function CreateGoal() {
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGoalForm>({
    resolver: zodResolver(schema),
  });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desireWeeklyFrequency: data.desireWeeklyFrequency,
    });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pendingGoals"] });
    reset();
  }

  return (
    <DialogContent>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desireWeeklyFrequency"
                defaultValue={3}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          7x na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
              {errors.desireWeeklyFrequency && (
                <p className="text-red-400 text-sm">
                  {errors.desireWeeklyFrequency.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogTrigger asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogTrigger>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
