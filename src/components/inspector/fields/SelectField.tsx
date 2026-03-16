import type { ConfigFieldOption } from "../../../types/configSchema";

interface Props {
  label: string;
  options: ConfigFieldOption[];
  value: string | number | boolean | undefined;
  onChange: (value: string) => void;
}

export function SelectField({ label, options, value, onChange }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
      <select
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm appearance-none"
        onChange={(event) => onChange(event.target.value)}
        value={String(value ?? "")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
