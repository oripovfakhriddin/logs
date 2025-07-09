
import { cn } from "@/lib/utils";
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
  Controller,
} from "react-hook-form";
import type { ClassNameValue } from "tailwind-merge";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import FieldError from "./form-error";
import FieldLabel from "./form-label";

interface IProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  label?: string;
  wrapperClassName?: ClassNameValue;
  hideError?: boolean;
  required?: boolean;
  length?: number;
}

export default function FormInputOTP<IForm extends FieldValues>({
  methods,
  name,
  label,
  wrapperClassName,
  hideError = false,
  required = false,
  length = 6,
  ...props
}: IProps<IForm> & any) {
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <fieldset
      className={cn(
        "flex flex-col items-center gap-1 w-full",
        wrapperClassName
      )}
    >
      {label && (
        <FieldLabel
          htmlFor={name}
          className={cn(!!errors?.[name] && "text-destructive")}
          required={required}
          isError={!!errors?.[name]}
        >
          {label}
        </FieldLabel>
      )}

      <Controller
        control={control}
        name={name}
        rules={{
          required: required
            ? {
                value: true,
                message: `${label || "Field"}ni kiriting`,
              }
            : undefined,
        }}
        render={({ field }) => (
          <InputOTP
            maxLength={length}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={field.value ? String(field.value) : ""}
            onChange={(newValue) => field.onChange(newValue)}
            onBlur={field.onBlur}
            {...props}
          >
            <InputOTPGroup className="flex gap-2">
              {Array.from({ length }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  className="border text-xl"
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      {!hideError && errors[name] && (
        <FieldError>
          {(errors[name]?.message as string) || errors.root?.[name]?.message}
        </FieldError>
      )}
    </fieldset>
  );
}
