import Image from "next/image";

interface ProfileAvatarProps {
    size?: 'sm' | 'md' | 'lg';
    src?: string;
    alt?: string;
    border?: boolean;
    className?: string;
  }
  
  const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
    size = 'md', 
    src = 'https://avatar.iran.liara.run/public/boy', 
    alt = 'Avatar', 
    border = false,
    className = ''
  }) => {
    const sizeClasses = {
      sm: 'w-[14px] h-[14px] md:w-[16px] md:h-[16px]',
      md: 'w-[30px] h-[30px] md:w-[38px] md:h-[38px]',
      lg: 'w-[50px] h-[50px] md:w-[65px] md:h-[65px] lg:w-[79px] lg:h-[79px]'
    };
    
    return (
      <div className={`
        ${sizeClasses[size]} 
        ${border ? 'border border-gray-dark' : ''}
        bg-[#D9D9D9] overflow-hidden rounded-full 
        flex items-center justify-center
        ${className} relative
      `}>
        <Image
          src={src} 
          alt={alt} 
          fill
          className="w-full h-full object-cover"
          onError={(e) => {
            // Handle image load errors by displaying the first letter of the alt text
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerText = alt?.charAt(0) || '?';
          }}
        />
      </div>
    );
  };
  
  export default ProfileAvatar;