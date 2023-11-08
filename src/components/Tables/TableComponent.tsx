import React from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { TableDataModel } from "../../core/models/TableDataModel";

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
                                        <View className="flex items-center justify-center">
                                            {
                                                item.action ? 
                                                <View className="m-2 py-1.5 px-2">
                                                    <Button title={item.text} color='blue' onPress={item.action} />
                                                </View>
                                                : <Text className="m-2 w-24 py-1.5 px-2 text-center">{item.text}</Text>
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