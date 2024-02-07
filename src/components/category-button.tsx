import { Text, Pressable, PressableProps } from "react-native";
//Pressable= Componente para toque e PressableProps= Tipagem do próprio Pressable

type CategoryProps =  PressableProps &{
    title: string,
    isSelected?: boolean
}

export function CategoryButton( {title , isSelected, ...rest} : CategoryProps){
    return(
       <Pressable className="bg-slate-800 px-4 justify-center rounded-md h-10 ">
            <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
       </Pressable>  
    )
}