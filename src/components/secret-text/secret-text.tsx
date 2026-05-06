/**
 * SecretText Component
 *
 * A simple controlled component for displaying sensitive text
 * Returns either the original text or a placeholder based on the `isVisible` prop
 * No styling, no UI elements - just the text content
 *
 * @example
 * ```tsx
 * const [showSecret, setShowSecret] = useState(false);
 *
 * <SecretText isVisible={showSecret}>
 *   my-secret-password
 * </SecretText>
 *
 * // With custom placeholder
 * <SecretText isVisible={false} placeholder="****-****">
 *   1234-5678
 * </SecretText>
 * ```
 */

interface SecretTextProps {
  children: string;
  isVisible: boolean;
  placeholder?: string;
}

function SecretText({ children, isVisible, placeholder = "••••••••••••••••" }: SecretTextProps) {
  return <>{isVisible ? children : placeholder}</>;
}

SecretText.displayName = "SecretText";

export { SecretText };
export type { SecretTextProps };
