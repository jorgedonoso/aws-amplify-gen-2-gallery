import { useState } from "react";

type FiltersProps = {
  loading: boolean;
  onApply: (filter: Record<string, unknown>) => void;
};

type FilterGroup = {
  title: string;
  selected: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
};

function Filters({ loading, onApply }: FiltersProps) {
  // Primary Demographics (Single Selection)
  const [gender, setGender] = useState<string>("Male");
  const [ethnicity, setEthnicity] = useState<string>("Asian");
  const [minAge, setMinAge] = useState<string>("20");
  const [maxAge, setMaxAge] = useState<string>("40");

  // Secondary Traits (Multi/Single Checkboxes)
  const [eyeColor, setEyeColor] = useState<string[]>([]);
  const [hairColor, setHairColor] = useState<string[]>([]);
  const [hairLength, setHairLength] = useState<string[]>([]);

  const toggleCheckbox = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const applyFilters = () => {
    const filter: Record<string, unknown> = {};

    // Demographic metadata for composite key lookups
    const payload = {
      gender: gender || null,
      ethnicity: ethnicity ? ethnicity.toLowerCase() : null,
      minAge: minAge ? Number(minAge) : null,
      maxAge: maxAge ? Number(maxAge) : null,
    };

    // Residual filters passed to DynamoDB FilterExpression
    if (eyeColor.length === 1) filter.eyeColor = { eq: eyeColor[0] };
    if (hairColor.length === 1)
      filter.hairColor = { eq: hairColor[0].toLowerCase() };
    if (hairLength.length === 1) filter.hairLength = { eq: hairLength[0] };

    onApply({ ...filter, __demographics: payload });
  };

  const filterGroups: FilterGroup[] = [
    {
      title: "Eye Color",
      selected: eyeColor,
      setter: setEyeColor,
      options: ["Blue", "Brown", "Green", "Grey"],
    },
    {
      title: "Hair Color",
      selected: hairColor,
      setter: setHairColor,
      options: ["Brown", "Black", "Blond", "Red", "Gray", "Other"],
    },
    {
      title: "Hair Length",
      selected: hairLength,
      setter: setHairLength,
      options: ["Short", "Medium", "Long"],
    },
  ];

  return (
    <aside className="rounded bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      <div className="mt-6">
        {/* Primary Filters */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Primary Filters
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Start with gender, ethnicity, and age.
            </p>
          </div>

          <div className="space-y-5">
            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Ethnicity */}
            <div>
              <label
                htmlFor="ethnicity"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Ethnicity
              </label>
              <select
                id="ethnicity"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Latino">Latino</option>
                <option value="White">White</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Age
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="mt-7 border-t border-gray-200 pt-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-700">
              Additional Filters
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Optional filters for more specific results.
            </p>
          </div>

          <div className="space-y-7">
            {filterGroups.map(({ title, selected, setter, options }) => (
              <div key={title}>
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                  {title}
                </h4>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() =>
                          toggleCheckbox(option, selected, setter)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={applyFilters}
          disabled={loading}
          className="mt-7 w-full rounded-md bg-purple-900 px-4 py-2 text-sm font-medium text-white hover:bg-purple-800 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Apply Filters"}
        </button>
      </div>
    </aside>
  );
}

export default Filters;
