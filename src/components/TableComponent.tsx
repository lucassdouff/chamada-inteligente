import React from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TableDataModel } from "../core/models/TableDataModel";

interface TableComponentProps {
    tableData: TableDataModel[][];
}

export default function TableComponent({ tableData } : TableComponentProps) {

    return (
        <View className="w-full">
            <ScrollView horizontal={true}>
                <View className="flex-col border divide-y"> 
                    {
                        tableData.map((arrList) => (
                            <View className="flex-row divide-x">
                                {
                                    arrList.map((item) => (
                                        <View>
                                            {
                                                item.action ? 
                                                <TouchableWithoutFeedback onPress={item.action}>
                                                    <Text className="w-24 py-2 px-2.5 text-center underline">{item.text}</Text>
                                                </TouchableWithoutFeedback>
                                                : <Text className="w-24 py-2 px-2.5 text-center">{item.text}</Text>
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}