import { 
  Stethoscope, 
  Headphones, 
  Brain, 
  Users, 
  Ear, 
  Settings,
  LucideIcon 
} from 'lucide-react';

interface ServiceIconProps {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  headphones: Headphones,
  brain: Brain,
  users: Users,
  ear: Ear,
  settings: Settings,
};

export function ServiceIcon({ iconName, className = "w-6 h-6" }: ServiceIconProps) {
  const IconComponent = iconMap[iconName] || Stethoscope; // Default to stethoscope if icon not found
  
  return <IconComponent className={className} />;
}
