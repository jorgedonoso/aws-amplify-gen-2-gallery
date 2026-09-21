import { capitalize } from "../helpers";

type Profile = {
  imageUrl: string;
  gender?: string | null;
  age?: number | null;
  ethnicity?: string | null;
  eyeColor?: string | null;
  hairColor?: string | null;
  hairLength?: string | null;
};

type ProfileCardProps = {
  profile: Profile;
};

function HairLength({ value }: { value?: string | null }) {
  const lengths = ["short", "medium", "long"];
  const activeIndex = lengths.indexOf(value?.toLowerCase() ?? "");

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {lengths.map((length, index) => (
          <div
            key={length}
            className={`h-2 flex-1 rounded-full ${
              index <= activeIndex ? "bg-purple-900" : "bg-purple-200"
            }`}
          />
        ))}
      </div>

      <p className="mt-1 text-xs text-gray-500">{capitalize(value ?? "")}</p>
    </div>
  );
}

function ProfileCard({ profile }: ProfileCardProps) {
  const details = [
    ["Gender", profile.gender],
    ["Age", profile.age != null ? Math.round(profile.age) : null],
    ["Ethnicity", profile.ethnicity],
    ["Eye Color", profile.eyeColor],
    ["Hair Color", profile.hairColor],
  ];

  return (
    <article className="overflow-hidden rounded bg-white shadow-sm ring-1 ring-gray-200 transition hover:bg-purple-50 hover:shadow-md">
      <img
        src={profile.imageUrl}
        alt=""
        className="aspect-square w-full object-cover"
      />

      <div className="p-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {details.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {value ? capitalize(value.toString()) : "—"}
              </p>
            </div>
          ))}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Hair Length
            </p>
            {profile.hairLength ? (
              <HairLength value={profile.hairLength} />
            ) : (
              <p className="mt-1 text-sm font-medium text-gray-900">—</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProfileCard;
