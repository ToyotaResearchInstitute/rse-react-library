import './global.css';

export { default as tailwindConfig } from './tailwind.config';
export { default as TRIApp, type TRIAppConfig, useTRIAppContext } from './tri-app';
export { default as CognitoProvider } from './amplify/cognito-provider';
export { useUserAuth } from './amplify/use-user-auth';
export { Highlight, Highlighter } from './components/highlighter';
export { FeedbackButton } from './layout/FeedbackButton';

/* ─── Form / input ─────────────────────────────────────────────── */
export { Button, buttonVariants } from './components/ui/button';
export { Input, type InputProps } from './components/ui/input';
export { Textarea, type TextareaProps } from './components/ui/textarea';
export { Label } from './components/ui/label';
export { Search, type SearchProps } from './components/ui/search';
export { Select } from './components/select';
export { Multiselect } from './components/multiselect';
export { Checkbox } from './components/ui/checkbox';
export { Switch } from './components/ui/switch';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Slider } from './components/ui/slider';
export { Calendar } from './components/ui/calendar';

/* ─── Overlays / feedback ──────────────────────────────────────── */
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerVariants,
} from './components/ui/drawer';
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipVariants,
} from './components/ui/tooltip';
export { Alert, AlertTitle, AlertDescription, alertVariants } from './components/ui/alert';
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  Toaster,
  toastVariants,
  toastIconVariants,
  type ToastProps,
  type ToastActionElement,
} from './components/ui/toast';
export { useToast, toast, type ToasterToast } from './components/ui/use-toast';

/* ─── Display ──────────────────────────────────────────────────── */
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/ui/card';
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
export { Separator } from './components/ui/separator';
export { Chip, chipVariants, type ChipProps } from './components/ui/chip';
export {
  NotificationDot,
  CountBadge,
  NotificationAnchor,
  dotVariants,
  countVariants,
  type NotificationDotProps,
  type CountBadgeProps,
  type BadgeColor,
} from './components/ui/notification-badge';
export { List, ListSubheader, ListItem, ListItemIcon, ListItemText } from './components/ui/list';
export { Skeleton } from './components/ui/skeleton';
export { Spinner, spinnerVariants } from './components/ui/spinner';

/* ─── Navigation / structure ───────────────────────────────────── */
export { Tabs, TabsList, TabsTrigger, TabsTriggerCount, TabsContent } from './components/ui/tabs';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/ui/accordion';
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './components/ui/pagination';
export { Stepper, type StepperProps, type StepperStep } from './components/ui/stepper';
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './components/ui/table';
