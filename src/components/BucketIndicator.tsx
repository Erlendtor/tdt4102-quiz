export default function BucketIndicator({
  bucket0,
  bucket1,
  bucket2,
  mastered,
}: {
  bucket0: number;
  bucket1: number;
  bucket2: number;
  mastered: number;
}) {
  return (
    <div className="flex gap-3 flex-wrap text-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-gray-300">Trenger øving <span className="font-bold text-white">{bucket0}</span></span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="text-gray-300">Nesten <span className="font-bold text-white">{bucket1}</span></span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-gray-300">Mestret <span className="font-bold text-white">{bucket2}</span></span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <span className="text-gray-300">Fullført <span className="font-bold text-white">{mastered}</span></span>
      </div>
    </div>
  );
}
