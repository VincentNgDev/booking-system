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
import { Button } from "../../button";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../../checkbox";
import SpinningSquareLoader from "../../loader/spinning-square-loader";

/**
 * Auth Form Context Type
 * @property {function} form - Form instance from react-hook-form
 * @property {function} onSubmit - Function to handle form submission
 * @property {boolean} isPending - Flag to indicate if the form is loading
 */
type AuthFormContextType = {
  form: ReturnType<typeof useForm<Record<string, any>>>;
  onSubmit: (data: any) => void;
  isPending: boolean;
};

/**
 * Auth Form Context
 */
const AuthFormContext = React.createContext<AuthFormContextType | undefined>(
  undefined
);

/**
 * Custom hook to use the AuthFormContext
 * @returns {AuthFormContextType} The context value
 * @throws {Error} If the context is undefined
 */
function useAuthFormContext() {
  const context = React.useContext(AuthFormContext);
  if (context === undefined) {
    throw new Error(
      "useAuthFormContext must be used within an AuthFormProvider"
    );
  }
  return context;
}

/**
 * Auth Form State Type
 * @property {boolean} success - Indicates if the authentication was successful
 * @property {string} message - Message to display to the user
 */
export type AuthState = {
  success: boolean;
  message: string;
};

/**
 * Auth Form Provider Component
 * @param {Record<string, any>} [initialValue] - Initial form values
 * @param {React.ReactNode} children - Child components
 * @param {(data: any) => Promise<AuthState> | AuthState} onformSubmit - Function to handle form submission
 */
function AuthFormProvider({
  initialValue,
  children,
  onformSubmit,
}: {
  initialValue?: Record<string, any> | undefined;
  children: React.ReactNode;
  onformSubmit: (data: any) => Promise<AuthState> | AuthState;
}) {
  const form = useForm({
    values: initialValue,
    mode: "onSubmit",
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
    <AuthFormContext.Provider value={contextValue}>
      {children}
    </AuthFormContext.Provider>
  );
}

/**
 * Auth Form Core Component
 * Contains the form structure of shadcn/ui which using react-hook-form
 * @param {React.ReactNode} [children] - Child components
 */
function AuthFormCore({ children }: { children?: React.ReactNode }) {
  const { form, onSubmit } = useAuthFormContext();
  return (
    <Form {...form}>
      <form
        className={cn("w-full", "space-y-4")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}

        {/* Error Message */}
        {form.formState.errors.root?.message && (
          <p className="w-full text-destructive text-sm">
            {form.formState.errors.root?.message}
          </p>
        )}
      </form>
    </Form>
  );
}

/**
 * Auth Form Component
 * @param {Object} props - The component props
 * @param {Record<string, any>} [props.initialValue] - Initial form values
 * @param {React.ReactNode} [props.children] - Child components
 * @param {(data: any) => Promise<AuthState> | AuthState} props.onformSubmit - Function to handle form submission
 * @returns
 */
export function AuthForm({
  initialValue,
  children,
  onformSubmit,
}: {
  initialValue?: Record<string, any> | undefined;
  children?: React.ReactNode;
  onformSubmit: (data: any) => Promise<AuthState> | AuthState;
}) {
  return (
    <AuthFormProvider initialValue={initialValue} onformSubmit={onformSubmit}>
      <AuthFormCore>{children}</AuthFormCore>
    </AuthFormProvider>
  );
}

/**
 * Auth Form Submit Component
 * @param {React.ReactNode} children - Child components
 * @param {string} [loadingText] - Text to display while loading
 */
export function AuthFormSubmit({
  children,
  loadingText,
  ...props
}: Omit<React.ComponentProps<"button">, "type" | "disabled"> & {
  loadingText?: string;
}) {
  const { isPending } = useAuthFormContext();

  return (
    <Button type="submit" {...props} disabled={isPending}>
      {!isPending && children}
      {isPending && (
        <span className="flex flex-row space-x-3">
          <SpinningSquareLoader size={16} />
          <span>{loadingText || "Loading..."}</span>
        </span>
      )}
    </Button>
  );
}

/**
 * Auth Form Field Wrapper Component Props Type
 * @property {string} - The name of the form field
 * @property {boolean?} [isRequiredField] - Flag to indicate if the field is required
 * @property {function?} [customValidation] - Custom validation function
 * @property {string?} [caption] - Caption for the field
 * @property {string?} [hint] - Hint for the field
 */
type AuthFormFieldBaseProps = {
  propertyName: string;
  isRequiredField?: boolean;
  customValidation?: (value: any) => Promise<boolean | string>;
  caption?: string;
  hint?: string;
};

/**
 * Auth Form Field Wrapper Component
 * @param {string} propertyName - The name of the form field
 * @param {boolean?} isRequiredField - Flag to indicate if the field is required
 * @param {function?} customValidation - Custom validation function
 * @param {string?} caption - Caption for the field
 * @param {string?} hint - Hint for the field
 * @param {function} formControlRender - Function to render the form control
 */
function AuthFormFieldWrapper({
  propertyName,
  caption,
  customValidation,
  isRequiredField,
  hint,
  formControlRender,
}: AuthFormFieldBaseProps & {
  formControlRender: (field: ControllerRenderProps) => React.ReactElement;
}) {
  const { form } = useAuthFormContext();
  return (
    <div>
      <FormField
        control={form.control}
        name={propertyName}
        render={({ field }) => {
          return (
            <FormItem>
              <div className="space-y-2">
                {caption && <FormLabel>{caption}</FormLabel>}
                {formControlRender && formControlRender(field)}
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

/**
 * Auth Form Field Input Component
 * @param {function} onInputChange - Function to handle input change
 * @param {string} type - Type of the input field
 * @param {} props - Other props of AuthFormFieldBaseProps
 */
export function AuthFormFieldInput({
  onInputChange,
  type,
  ...props
}: AuthFormFieldBaseProps & {
  onInputChange?: (value: any) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <AuthFormFieldWrapper
      {...props}
      formControlRender={({ onChange, value, ...field }) => {
        return (
          <div className={cn("relative")}>
            <FormControl>
              <Input
                className="w-full"
                value={value ?? ""}
                type={
                  type && type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                onChange={(e) => {
                  onChange(e);
                  if (onInputChange) {
                    // Get the value from the input field
                    onInputChange(e.currentTarget.value);
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

/**
 * Auth Form Field CheckBox Component
 * @param {React.ReactNode} children - Child components
 * @param {} props - Other props of AuthFormFieldBaseProps
 */
export function AuthFormFieldCheckBox({
  children,
  ...props
}: Omit<AuthFormFieldBaseProps, "caption"> & { children?: React.ReactNode }) {
  return (
    <AuthFormFieldWrapper
      {...props}
      formControlRender={({ onChange, value }) => {
        return (
          <div className={cn("flex flex-row items-center space-x-2")}>
            <FormControl>
              <Checkbox checked={value} onCheckedChange={onChange} />
            </FormControl>
            {children && <FormLabel>{children}</FormLabel>}
          </div>
        );
      }}
    />
  );
}
