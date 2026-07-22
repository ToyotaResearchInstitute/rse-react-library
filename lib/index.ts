import './global.css';

export { default as tailwindConfig } from './tailwind.config';
export { default as TRIApp, type TRIAppConfig, useTRIAppContext } from './tri-app';
export { default as CognitoProvider } from './amplify/cognito-provider';
export { useUserAuth } from './amplify/use-user-auth';
export { Highlight, Highlighter } from './components/ui/highlighter';
export { FeedbackButton } from './layout/FeedbackButton';

/* ─── Form / input ─────────────────────────────────────────────── */
export { Button, buttonVariants } from './components/ui/button';
export { Input, type InputProps } from './components/ui/input';
export { Textarea, type TextareaProps } from './components/ui/textarea';
export { Label } from './components/ui/label';
export { Search, type SearchProps } from './components/ui/search';
export { Kbd } from './components/ui/kbd';
export {
  Autocomplete,
  type AutocompleteProps,
  type AutocompleteOption,
} from './components/ui/autocomplete';
export {
  FilterBar,
  FilterChip,
  FilterCount,
  type FilterChipProps,
} from './components/ui/filter-bar';
export { Select, type OptionType } from './components/ui/select';
export { Multiselect } from './components/ui/multiselect';
export { Checkbox } from './components/ui/checkbox';
export { Switch } from './components/ui/switch';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Slider } from './components/ui/slider';
export { Calendar } from './components/ui/calendar';
export { DatePicker, type DatePickerProps } from './components/ui/date-picker';
export {
  DateRangePicker,
  type DateRangePickerProps,
  type DateRange,
} from './components/ui/date-range-picker';
export { TimePicker, type TimePickerProps, type TimeValue } from './components/ui/time-picker';
export {
  DateTimePicker,
  type DateTimePickerProps,
  type DateTimeValue,
} from './components/ui/date-time-picker';

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
export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants } from './components/ui/alert';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandEmpty,
  CommandSeparator,
} from './components/ui/command';
export { Snackbar, SnackbarViewport, type SnackbarProps } from './components/ui/snackbar';
export { EmptyState, type EmptyStateProps } from './components/ui/empty-state';
export { AnnotationTooltip, type AnnotationTooltipProps } from './components/ui/tooltip';
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
  CardMedia,
  CardEyebrow,
  StatCard,
  cardVariants,
} from './components/ui/card';
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarWrap,
  AvatarPresence,
  AvatarGroup,
  avatarVariants,
} from './components/ui/avatar';
export { StatusPill, statusPillVariants, type StatusPillProps } from './components/ui/status-pill';
export { Separator, LabeledSeparator } from './components/ui/separator';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb';
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
export { List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemCount } from './components/ui/list';
export {
  Skeleton,
  SkeletonListItem,
  SkeletonStatTiles,
  SkeletonTableRows,
} from './components/ui/skeleton';
export { Spinner, FullPageLoader, spinnerVariants } from './components/ui/spinner';
export { DotsLoader, type DotsLoaderProps } from './components/ui/dots-loader';
export {
  Progress,
  CircularProgress,
  type ProgressProps,
  type CircularProgressProps,
} from './components/ui/progress';

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
  TableToolbar,
  TableSortButton,
} from './components/ui/table';
