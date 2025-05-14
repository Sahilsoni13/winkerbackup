import { ToggleProps } from "@/types/type";
import { Switch } from "@headlessui/react";

/**
 * @component ToggleSwitch
 * @description A customizable toggle switch component with an optional label, description, and icon.
 * 
 * @props
 * @property {string} label - The label displayed next to the toggle switch.
 * @property {string} description - An optional description displayed below the label.
 * @property {ReactNode} icon - An optional icon displayed before the label.
 * @property {boolean} enabled - The current state of the switch (on/off).
 * @property {(value: boolean) => void} setEnabled - Function to update the switch state.
 */

const ToggleSwitch: React.FC<ToggleProps> = ({
  label,
  description,
  icon,
  enabled,
  setEnabled,
}) => {
  
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-start space-x-3">
        <span className="text-gray-600">{icon}</span>
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-black" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
      >
        <span
          className={`${enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
