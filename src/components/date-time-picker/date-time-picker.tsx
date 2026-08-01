"use client";

import React from "react";
import {
  DayButtonProps,
  DayPicker,
  WeekdayProps,
  NavProps,
  CaptionLabelProps,
  DropdownProps,
  DropdownNavProps,
  DayProps,
  type DropdownOption,
} from "react-day-picker";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

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
  const { className, options, classNames, components, ...rest } = props;
  void classNames;
  void components;

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
  void modifiers;

  return <td className={cn("p-1.5", className)} {...rest} />;
}

function DayButton(props: DayButtonProps) {
  const { day, modifiers, color, ...buttonProps } = props;
  void color;

  if (modifiers.selected) {
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

function formatTimeValue(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function combineDateAndTime(date: Date, time: string): Date {
  const [hoursStr, minutesStr] = time.split(":");
  const next = new Date(date);
  next.setHours(Number(hoursStr) || 0, Number(minutesStr) || 0, 0, 0);
  return next;
}

export type DateTimePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disablePastDates?: boolean;
  className?: string;
};

export function DateTimePicker({
  value,
  onChange,
  disablePastDates = false,
  className,
}: DateTimePickerProps) {
  const [internalValue, setInternalValue] = React.useState<Date | undefined>();
  const isControlled = onChange !== undefined;
  const selected = isControlled ? value : internalValue;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disabledDays = disablePastDates ? { before: today } : undefined;

  const emit = React.useCallback(
    (next: Date | undefined) => {
      if (onChange) {
        onChange(next);
      } else {
        setInternalValue(next);
      }
    },
    [onChange]
  );

  const handleDaySelect = React.useCallback(
    (day: Date | undefined) => {
      if (!day) {
        emit(undefined);
        return;
      }

      const time = selected ? formatTimeValue(selected) : formatTimeValue(new Date());
      emit(combineDateAndTime(day, time));
    },
    [emit, selected]
  );

  const handleTimeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const time = event.target.value;
      if (!time) return;

      const base = selected ? new Date(selected) : new Date();
      emit(combineDateAndTime(base, time));
    },
    [emit, selected]
  );

  const handleClear = React.useCallback(() => {
    emit(undefined);
  }, [emit]);

  return (
    <div className={cn("relative", className)}>
      <DayPicker
        mode="single"
        captionLayout="dropdown"
        selected={selected}
        onSelect={handleDaySelect}
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

      <div className="mt-3 flex items-end justify-between gap-3 px-1">
        <Input
          label="Time"
          type="time"
          size="sm"
          value={selected ? formatTimeValue(selected) : ""}
          onChange={handleTimeChange}
          className="w-[8.5rem]"
        />
        <Button variant="light" size="sm" onClick={handleClear} disabled={!selected}>
          Clear
        </Button>
      </div>
    </div>
  );
}
