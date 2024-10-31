import { CircleUser, Shield } from "lucide-react";

interface AuthDisplayProps {
  authProvider: string;
  userId: string;
  name?: string;
}

const AuthDisplay = ({ authProvider, userId, name }: AuthDisplayProps) => (
  <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200">
    <div className="flex items-center gap-3">
      <div className="bg-violet-100 p-2 rounded-full">
        <CircleUser className="w-8 h-8 text-violet-600" />
      </div>
      <div className="flex-1">
        {name && (
          <h3 className="font-medium text-violet-900">{name}</h3>
        )}
        <div className="flex items-center gap-2 text-sm text-violet-600">
          <Shield className="w-4 h-4" />
          <span>Authenticated via {authProvider}</span>
        </div>
        <p className="text-xs text-violet-400 mt-1">ID: {userId}</p>
      </div>
    </div>
  </div>
)

export default AuthDisplay;