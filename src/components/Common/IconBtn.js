export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-400 bg-transparent" : "bg-yellow-400"
        } cursor-pointer gap-x-2 rounded-md py-1 px-2 sm:py-2 sm:px-5 font-semibold text-richblack-900 ${customClasses} text-sm sm:text-base`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-500"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }