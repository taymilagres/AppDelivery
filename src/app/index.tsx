import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, Text} from "react-native";


export default function Home(){
    return(
        <View className="flex-1 pt-10">
           <Header title="Faça seu pedido" cartQuantityItems={5}/>

           <View className="flex-row gap-4">
                <CategoryButton title="Lanche do dia" />
                <CategoryButton title="Lanche do dia" />
                <CategoryButton title="Lanche do dia" />
           </View>
        </View>

        
    )
}