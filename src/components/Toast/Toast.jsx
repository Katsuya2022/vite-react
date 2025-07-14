import { useRef, createContext, useCallback, useState, useContext } from 'react';
import { Toast as BootstrapToast } from 'bootstrap/dist/js/bootstrap.bundle.min';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);
  /**
   * トーストを表示する
   * title タイトル
   * message メッセージ
   * type bootstrapのprimaryやdangerを受け取り背景色を変更する
   */
  const [toastData, setToastData] = useState({ title: '', message: '', type: '' });

  const showToast = useCallback(({title, message, type}) => {
    setToastData({ title, message, type });
    // DOMが更新されてからshowを呼び出す
    setTimeout(() => {
      if (toastRef.current) {
        const instance = BootstrapToast.getOrCreateInstance(toastRef.current);
        instance.show();
      }
    }, 100);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
        <div
          ref={toastRef}
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header bg-${toastData.type} text-white`}>
            <strong className="me-auto">{toastData.title}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">{toastData.message}</div>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
