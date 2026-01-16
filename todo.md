# QRky Project TODO List

Here is a list of suggested improvements for the QRky project.

## General Improvements

-   [ ] **Type Safety:** Improve type safety by replacing `any` and `as any` with more specific types.
-   [ ] **Error Handling:** Enhance error handling, especially in the `QRCodeDecoder` component.
-   [ ] **Code Duplication:** Refactor duplicated code into reusable components or functions.
-   [ ] **Accessibility:** Add missing accessibility attributes to form elements.
-   [ ] **Performance:** Optimize the `QRCodeGenerator` to reduce unnecessary re-renders.

## File-Specific Improvements

### `src/hooks/use-toast.ts`

-   [ ] Change `TOAST_REMOVE_DELAY` to a more reasonable value (e.g., 5000ms) to prevent memory leaks.

### `src/components/QRky.tsx`

-   [ ] Break down the large `config` state object into smaller, more manageable pieces.
-   [ ] Remove the `useEffect` hook that forces re-renders.
-   [ ] Simplify the `generateQRData` function.
-   [ ] Replace hardcoded values with constants.
-   [ ] Break down the main component into smaller, more focused components.

### `src/components/QRCodeGenerator.tsx`

-   [ ] Refine the `useEffect` dependency array to only include properties relevant to QR code generation.
-   [ ] Refactor the drawing logic for better clarity.

### `src/components/QRCodeDecoder.tsx`

-   [ ] Add more comprehensive error handling to the `handleFileChange` function.
-   [ ] Define a constant for `MAX_WIDTH`.

### `src/components/WCAGAnalyzer.tsx`

-   [ ] Simplify the `getLuminance` function.
