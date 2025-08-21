import { MapPin, Monitor, Zap, Users } from 'lucide-react';

interface ServiceModeIndicatorProps {
  mode: 'in-person' | 'virtual' | 'hybrid';
  isGroup: boolean;
}

export function ServiceModeIndicator({ mode, isGroup }: ServiceModeIndicatorProps) {
  const getModeIcon = () => {
    switch (mode) {
      case 'in-person':
        return <MapPin className="w-3 h-3" />;
      case 'virtual':
        return <Monitor className="w-3 h-3" />;
      case 'hybrid':
        return <Zap className="w-3 h-3" />;
      default:
        return <MapPin className="w-3 h-3" />;
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'in-person':
        return 'In-Person';
      case 'virtual':
        return 'Virtual';
      case 'hybrid':
        return 'In-Person or Virtual';
      default:
        return 'In-Person';
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-black">
      <div className="flex items-center gap-1">
        {getModeIcon()}
        <span>{getModeLabel()}</span>
      </div>
      {isGroup && (
        <div className="flex items-center gap-1">
          <span className="text-black">•</span>
          <Users className="w-3 h-3" />
          <span>Group</span>
        </div>
      )}
    </div>
  );
}
