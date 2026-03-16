interface Props {
  label: string;
  value: string | number | boolean | undefined;
  onChange: (value: boolean) => void;
}

export function ToggleField({ label, value, onChange }: Props) {
  return (
    <label className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-all shadow-sm group cursor-pointer font-medium">
      <span className="text-sm text-slate-700 group-hover:text-accent transition-colors">{label}</span>
      <input 
        checked={Boolean(value)} 
        onChange={(event) => onChange(event.target.checked)} 
        type="checkbox" 
        className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent/20"
      />
    </label>
  );
}
