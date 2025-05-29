import React, { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { useSwipeable } from "react-swipeable";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const _Comp = asChild ? Slot : "div";
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const _Comp = asChild ? Slot : "button";
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Main TabsComponent with activeTab state
export const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("bo");
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  const increment = () => {
    setAnimating(true);
    setCount(count + 1);
    setTimeout(() => setAnimating(false), 300);
  };

  const tabOrder = ["bo", "tuk", "법마상전급"];
  const currentIndex = tabOrder.indexOf(activeTab);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextTab = tabOrder[(currentIndex + 1) % tabOrder.length];
      setActiveTab(nextTab);
    },
    onSwipedRight: () => {
      const prevTab = tabOrder[(currentIndex - 1 + tabOrder.length) % tabOrder.length];
      setActiveTab(prevTab);
    },
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers} className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="bo" onClick={() => setActiveTab("bo")}>
            보통급
          </TabsTrigger>
          <TabsTrigger value="tuk" onClick={() => setActiveTab("tuk")}>
            특신급
          </TabsTrigger>
          <TabsTrigger value="법마상전급" onClick={() => setActiveTab("법마상전급")}>
            법마상전급
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bo">
          <div className="flex items-center justify-between">
            <span>보통급: </span>
            <div className={`count ${animating ? "animate-count" : ""}`}>{count}</div>
            <button onClick={increment}>+</button>
          </div>
        </TabsContent>

        <TabsContent value="tuk">
          <div className="flex items-center justify-between">
            <span>특신급: </span>
            <div className={`count ${animating ? "animate-count" : ""}`}>{count}</div>
            <button onClick={increment}>+</button>
          </div>
        </TabsContent>

        <TabsContent value="법마상전급">
          <div className="flex items-center justify-between">
            <span>법마상전급: </span>
            <div className={`count ${animating ? "animate-count" : ""}`}>{count}</div>
            <button onClick={increment}>+</button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
