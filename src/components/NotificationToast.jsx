import { useSelector } from 'react-redux';

export default function NotificationToast() {
  const { message, visible } = useSelector((state) => state.ui);

  if (!visible) return null;

  return (
    <div
      className="toast"
      role="status"
      style={{ top: 24, bottom: 'auto' }}
    >
      {message}
    </div>
  );
}
