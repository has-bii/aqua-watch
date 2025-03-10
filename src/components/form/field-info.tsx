import { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <p className="text-xs text-red-500">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors[0].message}</em>
      ) : null}
      {/* {field.state.meta.isValidating ? "Validating..." : null} */}
    </p>
  );
}
