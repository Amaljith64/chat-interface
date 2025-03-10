import Image from "next/image";

interface SuggestionCardProps {
    icon: string;
    text: string;
  }
  
  const SuggestionCard: React.FC<SuggestionCardProps> = ({ icon, text }) => {
    return (
      <div className=" border border-border rounded-xl shadow-md  shadow-[#EDFFC9]  px-4 py-2 ">
        <div className="my-1">
          <Image width={16} height={16} src={icon} alt="suggested icons1"/>

        </div>
        <p className="font-darker font-medium text-base md:text-xl leading-tight md:leading-[27px] tracking-tighter md:w-[132px]">
          {text}
        </p>
      </div>
    );
  };
  
  export default SuggestionCard;