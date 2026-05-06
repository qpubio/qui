import React from "react";
import {
    DayButtonProps,
    DayPicker,
    DateRange,
    WeekdayProps,
    NavProps,
    CaptionLabelProps,
    DropdownProps,
    DropdownNavProps,
  DayProps,
  type DropdownOption,
} from "react-day-picker";
import { Button } from "../button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const SelectedDateContext = React.createContext<{
  selected?: DateRange;
  setSelected?: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}>({});

function Nav(props: NavProps) {
  const { className, onPreviousClick, onNextClick, previousMonth, nextMonth, ...rest } = props;

  return (
    <nav className={cn("flex justify-between items-center w-full mb-2", className)} {...rest}>
      <Button
        variant="light"
        isIconOnly
        onClick={onPreviousClick}
        disabled={!previousMonth}
        aria-label="Go to previous month"
        className="w-10 h-10"
      >
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </Button>

      <Button
        variant="light"
        isIconOnly
        onClick={onNextClick}
        disabled={!nextMonth}
        aria-label="Go to next month"
        className="w-10 h-10"
      >
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </Button>
    </nav>
  );
}

function CaptionLabel(props: CaptionLabelProps) {
  void props;

  return <span></span>;
}

function DropdownNav(props: DropdownNavProps) {
  const { className, children, ...rest } = props;

  return (
    <div
      className={cn(
        "absolute top-[0.15rem] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function Dropdown(props: DropdownProps) {
  const { className, options, ...rest } = props;

  return (
    <select
      className={cn(
        "text-sm bg-transparent border border-foreground/20 outline-none cursor-pointer",
        "hover:bg-foreground/10 rounded-md px-1 py-1.5",
        className
      )}
      {...rest}
    >
      {options?.map((option: DropdownOption) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Weekday(props: WeekdayProps) {
  const { className, children, ...rest } = props;

  return (
    <th
      className={cn(
        "text-xs text-muted font-medium uppercase tracking-wider",
        "px-2 py-3",
        className
      )}
      {...rest}
    >
      {children}
    </th>
  );
}

function Day(props: DayProps) {
  const { className, day, modifiers, ...rest } = props;
  void day;

  let bgClass = "";

  // Single day selection (both start and end)
  if (modifiers.range_start && modifiers.range_end) {
    bgClass = "bg-primary/20 rounded-md";
  } else if (modifiers.range_start) {
    bgClass = "bg-primary/20 rounded-l-md";
  } else if (modifiers.range_end) {
    bgClass = "bg-primary/20 rounded-r-md";
  } else if (modifiers.range_middle) {
    bgClass = "bg-primary/20";
  }

  return <td className={cn("p-1.5", bgClass, className)} {...rest} />;
}

function DayButton(props: DayButtonProps) {
  const { day, modifiers, color, ...buttonProps } = props;
  void color;

  // Handle range selection states
  if (modifiers.range_start) {
    return (
      <Button
        variant="solid"
        color="primary"
        isIconOnly
        aria-label={day.date.toLocaleDateString()}
        {...buttonProps}
        className={cn("w-10 h-10 font-light", buttonProps.className)}
      />
    );
  }

  if (modifiers.range_end) {
    return (
      <Button
        variant="solid"
        color="primary"
        isIconOnly
        aria-label={day.date.toLocaleDateString()}
        {...buttonProps}
        className={cn("w-10 h-10 font-light", buttonProps.className)}
      />
    );
  }

  if (modifiers.range_middle) {
    return (
      <Button
        variant="light"
        isIconOnly
        aria-label={day.date.toLocaleDateString()}
        {...buttonProps}
        className={cn("w-10 h-10 font-light", buttonProps.className)}
      />
    );
  }

  // Default states
  const variant = modifiers.today ? "faded" : "light";

  return (
    <Button
      variant={variant}
      isIconOnly
      aria-label={day.date.toLocaleDateString()}
      {...buttonProps}
      className={cn("w-10 h-10 font-light", buttonProps.className)}
    />
  );
}

export function DateRangePicker({ 
  disableFutureDates = false, 
  selected, 
  onSelect 
}: { 
  disableFutureDates?: boolean;
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}) {
  const [internalSelected, setInternalSelected] = React.useState<DateRange | undefined>();

  const today = new Date();
  const disabledDays = disableFutureDates ? { after: today } : undefined;

  // Use controlled or uncontrolled state
  const selectedRange = selected !== undefined ? selected : internalSelected;
  
  const handleSelect = React.useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Check if it's a single day selection (same date for from and to)
      const isSameDay = range.from.toDateString() === range.to.toDateString();
      
      if (isSameDay) {
        // Convert to full day range: start of day to end of day
        const startOfDay = new Date(range.from);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(range.to);
        endOfDay.setHours(23, 59, 59, 999);
        
        const fullDayRange = {
          from: startOfDay,
          to: endOfDay
        };
        
        if (onSelect) {
          onSelect(fullDayRange);
        } else {
          setInternalSelected(fullDayRange);
        }
        return;
      }
    }
    
    // Handle single day selection (when only 'from' is set)
    if (range?.from && !range?.to) {
      // Check if user clicked on the same day that's already selected
      if (selectedRange?.from && range.from.toDateString() === selectedRange.from.toDateString()) {
        // Convert to full day range
        const startOfDay = new Date(range.from);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(range.from);
        endOfDay.setHours(23, 59, 59, 999);
        
        const fullDayRange = {
          from: startOfDay,
          to: endOfDay
        };
        
        if (onSelect) {
          onSelect(fullDayRange);
        } else {
          setInternalSelected(fullDayRange);
        }
        return;
      }
    }
    
    // For regular range selection or undefined
    if (onSelect) {
      onSelect(range);
    } else {
      setInternalSelected(range);
    }
  }, [onSelect, selectedRange]);

  // Create a dispatch function for the context
  const contextSetSelected = React.useCallback((value: React.SetStateAction<DateRange | undefined>) => {
    if (typeof value === 'function') {
      const newValue = value(selectedRange);
      handleSelect(newValue);
    } else {
      handleSelect(value);
    }
  }, [selectedRange, handleSelect]);

  return (
    <SelectedDateContext.Provider value={{ selected: selectedRange, setSelected: contextSetSelected }}>
      <div className="relative">
        <DayPicker
          mode="range"
          captionLayout="dropdown"
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={disabledDays}
          formatters={{
            formatMonthDropdown: (month: Date) =>
              new Intl.DateTimeFormat("en", { month: "short" }).format(month),
          }}
          components={{
            Day,
            DayButton,
            Weekday,
            Nav,
            CaptionLabel,
            Dropdown,
            DropdownNav,
          }}
        />
      </div>
    </SelectedDateContext.Provider>
  );
}
