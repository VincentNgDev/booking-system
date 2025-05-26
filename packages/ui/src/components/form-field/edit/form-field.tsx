"use client";

import React from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { cn } from "@workspace/ui/lib/utils";
import { Input } from "../../input";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import useCustomMediaQuery from "@workspace/ui/hooks/useMediaQuery";
import { useSidebar } from "../../sidebar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Button } from "../../button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { Checkbox } from "../../checkbox";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Calendar } from "../../calendar";
import moment from "moment";

type FormPageContextType = {
  form: ReturnType<typeof useForm<Record<string, any>>>;
  onSubmit: (data: any) => void;
  isPending: boolean;
};

const FormPageContext = React.createContext<FormPageContextType | undefined>(
  undefined
);

function useFormPageContext() {
  const context = React.useContext(FormPageContext);
  if (context === undefined) {
    throw new Error(
      "useFormPageContext must be used within a FormPageProvider"
    );
  }
  return context;
}

export type FormState = {
  success: boolean;
  message: string;
};

type FormPageBaseProps = {
  initialValue?: Record<string, any>;
  children: React.ReactNode;
  onformSubmit: (data: any) => Promise<FormState> | FormState;
};

function FormPageProvider({
  initialValue,
  children,
  onformSubmit,
}: FormPageBaseProps) {
  const form = useForm({
    values: initialValue,
  });

  const [isPending, startTransition] = React.useTransition();

  const onSubmit = React.useCallback(
    async (data: any) => {
      startTransition(async () => {
        const result = await onformSubmit(data);
        if (result && !result.success) {
          form.setError("root", {
            type: "custom",
            message: result.message,
          });
        }
      });
    },
    [onformSubmit]
  );

  const contextValue = React.useMemo(
    () => ({
      form,
      onSubmit,
      isPending,
    }),
    [form, onSubmit, isPending]
  );

  return (
    <FormPageContext.Provider value={contextValue}>
      {children}
    </FormPageContext.Provider>
  );
}

export function FormPage({
  initialValue,
  children,
  onformSubmit,
}: FormPageBaseProps) {
  return (
    <FormPageProvider initialValue={initialValue} onformSubmit={onformSubmit}>
      <FormPageCore>{children}</FormPageCore>
    </FormPageProvider>
  );
}

function FormPageCore({ children }: { children?: React.ReactNode }) {
  const { form, onSubmit } = useFormPageContext();
  return (
    <Form {...form}>
      <form
        className={cn("w-full", "grid grid-cols-10 gap-[10px]")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </Form>
  );
}

type FormFieldBaseProps = {
  propertyName: string;
  isRequiredField?: boolean;
  customValidation?: (value: any) => Promise<boolean | string>;
  fieldSpan?: "full" | "half";
  caption?: string;
  hint?: string;
};

function FormFieldWrapper({
  propertyName,
  isRequiredField = false,
  customValidation,
  formControlRender,
  fieldSpan = "half",
  caption,
  hint,
}: FormFieldBaseProps & {
  formControlRender: (field: ControllerRenderProps) => React.ReactElement;
}) {
  const { form } = useFormPageContext();
  const isMobile = useIsMobile();
  const isSmallScreen = useCustomMediaQuery("(max-width: 1348px)");
  const isSidebarOpen = useWithSideBar();
  const isFullSpan = React.useMemo(() => {
    return fieldSpan === "full" || isMobile || (isSmallScreen && isSidebarOpen);
  }, [fieldSpan, isSmallScreen, isSidebarOpen]);

  return (
    <div className={cn(isMobile || isFullSpan ? "col-span-10" : "col-span-5")}>
      <FormField
        control={form.control}
        name={propertyName}
        render={({ field }) => {
          return (
            <FormItem>
              <div
                className={cn(
                  "grid gap-[10px]",
                  isMobile || isFullSpan ? "grid-cols-10" : "grid-cols-5"
                )}
              >
                {caption && (
                  <div
                    className={cn(
                      "flex items-center justify-between break-all gap-[5px]",
                      isMobile
                        ? "col-span-full"
                        : isFullSpan
                          ? "col-span-2"
                          : "col-span-1"
                    )}
                  >
                    <FormLabel>{caption}</FormLabel>
                    {!isMobile && <FormLabel>:</FormLabel>}
                  </div>
                )}
                <div
                  className={cn(
                    "flex flex-col justify-center",
                    isMobile
                      ? "col-span-full"
                      : isFullSpan
                        ? "col-span-8"
                        : "col-span-4"
                  )}
                >
                  {formControlRender(field)}
                </div>
              </div>

              <div className={cn("flex flex-col")}>
                {hint && <FormDescription>{hint}</FormDescription>}
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
        rules={{
          required: {
            value: isRequiredField ?? false,
            message: "This field is required",
          },
          onBlur(event) {
            if (customValidation) {
              customValidation(event.target.value).then((result) => {
                if (result !== true) {
                  form.setError(propertyName, {
                    type: "custom",
                    message: result.toString(),
                  });
                }
              });
            }
          },
        }}
      />
    </div>
  );
}

function useWithSideBar() {
  try {
    const context = useSidebar();
    return context?.open ?? false;
  } catch (error) {
    return false;
  }
}

export function FormOnSubmit() {
  return <Button type="submit">Submit</Button>;
}

export function FormFieldInput({
  onInputChange,
  type,
  ...props
}: FormFieldBaseProps & {
  onInputChange?: (value: any) => Promise<void> | void;
  type?: React.HTMLInputTypeAttribute | undefined;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <FormFieldWrapper
      {...props}
      formControlRender={({ onChange, value, ...field }) => {
        return (
          <div className={cn("relative")}>
            <FormControl>
              <Input
                className="w-full"
                type={
                  type && type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                value={value ?? ""}
                onChange={async (e) => {
                  onChange(e);
                  if (onInputChange) {
                    // Get the value from the input field
                    await onInputChange(e.currentTarget.value);
                  }
                }}
                {...field}
              />
            </FormControl>
            {type && type === "password" && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            )}
          </div>
        );
      }}
    />
  );
}

export function FormFieldSingleSelect({
  options,
  placeholder,
  ...props
}: FormFieldBaseProps & {
  options: { name: string; value: any }[];
  placeholder?: string;
}) {
  return (
    <FormFieldWrapper
      {...props}
      formControlRender={(field) => {
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ name, value }) => {
                return (
                  <SelectItem key={name} value={value}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}

export function FormFieldCheckBox({ ...props }: FormFieldBaseProps) {
  return (
    <FormFieldWrapper
      {...props}
      formControlRender={(field) => {
        return (
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        );
      }}
    />
  );
}

export function FormFieldDatePicker({ ...props }: FormFieldBaseProps) {
  return (
    <FormFieldWrapper
      {...props}
      formControlRender={(field) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    moment(field.value, "DD-MM-YYYY").format()
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
