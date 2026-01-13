# Planning Guide

A visual dual-calendar service that displays two Google Calendars side-by-side in an optimized mobile layout, showing availability from 6 AM to midnight with hourly granularity.

**Experience Qualities**: 
1. **Efficient** - Quick visual scanning of availability across two calendars simultaneously
2. **Clear** - Distinct visual separation between busy and free time slots with intuitive color coding
3. **Accessible** - Mobile-first design with easy-to-read time blocks and straightforward setup process

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused calendar visualization tool with API integration, calendar selection, and instructional content - suitable for a light application with straightforward state management.

## Essential Features

### Dual Calendar Display
- **Functionality**: Display two Google Calendars side-by-side in vertical columns showing hourly time slots from 6 AM to midnight
- **Purpose**: Allow users to compare availability across two calendars at a glance (e.g., personal vs work, two team members)
- **Trigger**: User navigates to main view after connecting Google account
- **Progression**: Load calendars → Fetch events for current date → Render time grid (6 AM-midnight) → Mark busy slots → Display both calendars side-by-side
- **Success criteria**: Both calendars load within 2 seconds, busy time blocks are clearly distinguished from free blocks, time labels are readable

### Calendar Selection
- **Functionality**: Allow users to select which two calendars from their Google account to display
- **Purpose**: Users typically have multiple calendars and need to choose which two to compare
- **Trigger**: User clicks calendar selector controls
- **Progression**: Open selector → Display list of available calendars → User selects calendar 1 → User selects calendar 2 → Update display
- **Success criteria**: All calendars from user's account are available, selection persists between sessions

### Date Navigation
- **Functionality**: Navigate between different dates to view past and future availability
- **Purpose**: Users need to check availability for different days
- **Trigger**: User taps date navigation controls
- **Progression**: User taps previous/next day → Load events for new date → Update calendar display
- **Success criteria**: Navigation is instant, current date is clearly indicated

### Setup Instructions
- **Functionality**: Dedicated tab/view with step-by-step instructions for connecting Google Calendar, including detailed OAuth configuration and troubleshooting guide
- **Purpose**: Guide users through OAuth setup and API key configuration with clear error prevention and resolution
- **Trigger**: User navigates to "Setup" tab
- **Progression**: User opens setup tab → Read instructions → Follow Google Cloud Console steps → Configure OAuth consent screen → Set authorized URIs → Obtain credentials → Input credentials → Test connection → Return to calendar view
- **Success criteria**: Instructions are clear enough for non-technical users, includes all critical OAuth configuration steps (Authorized JavaScript origins, Authorized redirect URIs, Test users), provides troubleshooting section for common errors

## Edge Case Handling

- **No Events**: Display empty time grid with all slots marked as free
- **Overlapping Events**: Display merged busy block for overlapping event times
- **All-Day Events**: Show indicator bar at top of calendar column without blocking hourly slots
- **Failed API Connection**: Display clear error message with link back to setup instructions and specific troubleshooting steps
- **Invalid Credentials**: Show specific error about credentials (invalid API key, invalid Client ID, missing OAuth configuration) with solution guidance
- **OAuth Authorization Errors**: Handle ERR_BLOCKED_BY_RESPONSE, invalid_client, and access_blocked errors with detailed resolution steps in setup instructions
- **No Calendars Selected**: Display placeholder prompting user to select calendars
- **Timezone Differences**: Display all times in user's local timezone with clear label

## Design Direction

The design should evoke efficiency, clarity, and professionalism - like a digital scheduling assistant. It should feel modern and streamlined with a focus on information density without clutter. The interface should be immediately understandable with clear visual hierarchy and color coding that makes busy/free time instantly recognizable.

## Color Selection

A clean, professional palette with strong visual distinction between calendars and time states.

- **Primary Color**: Deep teal `oklch(0.55 0.12 195)` - Represents the first calendar with a professional, trustworthy feel
- **Secondary Colors**: Warm coral `oklch(0.65 0.15 25)` for the second calendar creating clear visual distinction; Light gray `oklch(0.96 0 0)` for free time slots
- **Accent Color**: Vibrant purple `oklch(0.6 0.2 290)` - For interactive elements, buttons, and current time indicator
- **Foreground/Background Pairings**: 
  - Background (White #FFFFFF): Dark text oklch(0.2 0 0) - Ratio 16.9:1 ✓
  - Primary (Teal oklch(0.55 0.12 195)): White text oklch(1 0 0) - Ratio 5.8:1 ✓
  - Secondary (Coral oklch(0.65 0.15 25)): White text oklch(1 0 0) - Ratio 5.1:1 ✓
  - Accent (Purple oklch(0.6 0.2 290)): White text oklch(1 0 0) - Ratio 5.5:1 ✓

## Font Selection

Typography should be clean and highly legible for scanning time slots quickly, with a modern sans-serif that works well at small sizes on mobile.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold/24px/tight letter spacing
  - H2 (Calendar Names): Space Grotesk SemiBold/18px/normal spacing
  - Time Labels: JetBrains Mono Medium/14px/tabular numbers for alignment
  - Body Text (Instructions): Inter Regular/16px/1.5 line height
  - Small Text (Metadata): Inter Regular/14px/muted color

## Animations

Animations should be minimal and functional, enhancing usability without creating distraction. Use subtle transitions when switching dates (200ms ease), smooth highlighting on time slot interactions (150ms), and gentle fade-in for calendar data loading (300ms). Navigation between tabs should use a subtle slide transition (250ms) to maintain spatial awareness.

## Component Selection

- **Components**: 
  - `Tabs` for switching between Calendar View and Setup Instructions
  - `Card` for wrapping each calendar column and instruction sections
  - `Button` for date navigation and calendar selection actions
  - `Select` for choosing which calendars to display
  - `Skeleton` for loading states while fetching calendar data
  - `Alert` for displaying connection errors or important notices
  - `Separator` for dividing time slots and sections
  - `Badge` for calendar labels and all-day event indicators
  - `ScrollArea` for the time grid to ensure smooth scrolling
  
- **Customizations**: 
  - Custom TimeGrid component that renders hourly slots from 6 AM to midnight
  - Custom BusyBlock component that overlays time slots with calendar-specific colors
  - Custom CalendarSelector component with calendar preview icons
  
- **States**: 
  - Buttons: Default solid with shadow, hover with subtle lift, active with pressed effect, disabled with reduced opacity
  - Time slots: Default light background, hover with subtle highlight, busy with solid calendar color, current hour with accent border
  - Selects: Clear focus ring, smooth dropdown animation
  
- **Icon Selection**: 
  - `CaretLeft`/`CaretRight` for date navigation
  - `Calendar` for calendar selection
  - `Info` for help/instruction indicators
  - `CheckCircle` for successful connection status
  - `WarningCircle` for errors or missing configuration
  - `Clock` for time-related indicators
  
- **Spacing**: 
  - Container padding: `p-4` on mobile, `p-6` on tablet+
  - Time slot height: `h-12` for easy touch targets
  - Gap between calendars: `gap-2` on mobile, `gap-4` on desktop
  - Section spacing: `space-y-6` for major sections
  
- **Mobile**: 
  - Stack calendar columns vertically on screens < 640px
  - Side-by-side layout on 640px+ with 50/50 split
  - Fixed header with date navigation that remains visible during scroll
  - Time labels stick to left edge during horizontal scroll
  - Touch-friendly minimum tap targets of 44x44px
  - Bottom navigation for tab switching on mobile
