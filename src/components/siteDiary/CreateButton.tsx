import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { PlusSquareFill } from "@styled-icons/bootstrap";
import { Close } from "@styled-icons/ionicons-outline";
import { useState, type BaseSyntheticEvent } from "react";
import ReactDatePicker from "react-datepicker";
import type { ControllerRenderProps } from "react-hook-form";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useCreateSiteDiary } from "../../hooks/siteDiary";

const CreateButton = ({ projectId }: { projectId: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { createSiteDiary } = useCreateSiteDiary();
  const onSubmit = (
    data: FieldValues,
    e: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => {
    e?.preventDefault();
    setOpen(false);
    reset();
    createSiteDiary({
      projectId: projectId,
      siteDiaryDate: data.date as Date,
      siteDiaryName: data.name as string,
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <PlusSquareFill className="h-6 w-6  text-blue-500" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-fade-in bg-slate-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-content-show rounded-md bg-white p-6 shadow-md focus:outline-none">
          <Dialog.Title className="m-0 font-medium text-gray-800">
            Create a new site diary
          </Dialog.Title>
          <Dialog.Description className="mx-0 mt-3 mb-5 text-sm text-gray-400">
            Give your site diary a name here. Click save when you are done.
          </Dialog.Description>
          <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
            <fieldset className="mb-4 flex items-center gap-5">
              <label
                className="w-24 text-right text-sm text-blue-300"
                htmlFor="name"
              >
                Name
              </label>
              <div>
                <input
                  className={`inline-flex h-8  flex-1 items-center justify-center rounded-md py-0 px-3 text-sm text-blue-500 shadow-sm shadow-blue-200 focus:border-2
                focus:border-blue-300 focus:outline-none ${
                  errors.name
                    ? "border-2 border-red-400 focus:border-2 focus:border-red-400"
                    : ""
                }`}
                  id="name"
                  defaultValue="My new site diary"
                  {...register("name", { required: true })}
                />
              </div>
              <label
                className="w-24 text-right text-sm text-blue-300"
                htmlFor="date"
              >
                Date
              </label>
              <Controller
                name="date"
                control={control}
                defaultValue={new Date()}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FieldValues, "date">;
                }) => {
                  const value = field.value as Date;
                  const { onChange, name } = field;
                  return (
                    <ReactDatePicker
                      name={name}
                      selected={value}
                      className={`inline-flex h-8  flex-1 items-center justify-center rounded-md py-0 px-3 text-sm text-blue-500 shadow-sm shadow-blue-200 focus:border-2
                    focus:border-blue-300 focus:outline-none ${
                      errors.name
                        ? "border-2 border-red-400 focus:border-2 focus:border-red-400"
                        : ""
                    }`}
                      onChange={(date) => {
                        if (date) {
                          const d = new Date();
                          date.setHours(d.getHours());
                          date.setMinutes(d.getMinutes());
                          date.setSeconds(d.getSeconds());
                          date.setMilliseconds(d.getMilliseconds());
                          onChange(date);
                        }
                      }}
                      previousMonthButtonLabel=<ChevronLeftIcon />
                      nextMonthButtonLabel=<ChevronRightIcon />
                      popperClassName="react-datepicker-bottom"
                    />
                  );
                }}
              />
            </fieldset>
            {errors.name && (
              <span className="flex justify-center text-xs italic text-red-400">
                Name is required
              </span>
            )}
            {errors.date && (
              <span className="flex justify-center text-xs italic text-red-400">
                Date is required
              </span>
            )}
            <div className="mt-6 flex justify-end">
              <button
                className="inline-flex h-9 items-center justify-center rounded-md bg-blue-100 py-0 px-4 text-sm font-medium text-blue-700 hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-200"
                type="submit"
                disabled={!!(errors.name || errors.date)}
              >
                Create
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-blue-200 focus:border-2 focus:border-blue-500 focus:outline-none"
                aria-label="Close"
                type="button"
              >
                <Close className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateButton;
