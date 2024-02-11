import { Header } from "@/components/header";
import { useNavigation } from "expo-router";


import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Product } from "@/components/product"; 

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";

const PHONE_NUMBER = "5531986459056"

export default function Cart(){
    const [address, setAddress] = useState("")
    const navigation = useNavigation()


    const cartStore = useCartStore()
    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

    function handleProductRemove(product: ProductCartProps){
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar"
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            },

        ])
    }

    function handleOrder(){
        if(address.trim().length === 0){
            return Alert.alert("Atenção", "Por favor informe os dados da entrega.")
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        //Formatando a menssagem de envio do pedido
        const message = `
        🍔NOVO PEDIDO!🍔
        \n Entregar em: ${address}

        ${products}

        \n Valor total: ${total}
        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

        cartStore.clear()
        navigation.goBack()
        Alert.alert("Concluído", "Pedido enviado com sucesso!")

    }

    return(
        <View className="flex-1 pt-10">
            <Header title="Seu Carrinho" />

            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                        
                    { cartStore.products.length > 0 ? (
                        <View className="border-b border-slate-700">
                        {
                            cartStore.products.map((product) => (
                                <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                            ))
                        }

                    </View>
                    ) : (
                    <Text className="font-body text-slate-400 text-center mx-8 my-8">
                        Ops! Seu carrinho está vazio.
                    </Text>
                    )}

                    <View className="flex-row gap-2 items-center mt-5 mb-4">
                        <Text className="text-white text-xl font-subtitle pl-3">Total:</Text>

                        <Text className="text-lime-400 text-2xl font-heading">
                            {total}
                        </Text>
                    </View>

                    <Input 
                        placeholder="Informe o endereço de entrega com: Rua, Bairro, CEP, Número e Complemento... " 
                        onChangeText={setAddress} 
                        onSubmitEditing={handleOrder} //Atributo para enviar com o enter
                        blurOnSubmit={true} //atributo para enviar com o enter (complementar)
                        returnKeyType="next"
                    /> 
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <AntDesign name="rightcircle" size={20} color="black" />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao Cardápio" href="/" />

            </View>
        </View>
    )
}