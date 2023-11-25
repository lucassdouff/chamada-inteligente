import React from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { TableDataModel } from "../../core/models/TableDataModel";

interface TableComponentProps {
    tableData: TableDataModel[][] | undefined;
}

export default function TableComponent({ tableData } : TableComponentProps) {

    const tableDataWithoutRemoveLine = tableData?.map((arrList) => (
        arrList.filter((item) => !item.removeLine)
    ));

    return (
        <View className="w-full">
            <ScrollView horizontal={true}>
                <View className="flex-col border divide-y"> 
                    {
                        tableDataWithoutRemoveLine?.map((arrList,index) => (
                            <View key={index} className="flex-row divide-x">
                                {
                                    arrList.map((item,index) => (
                                        <View key={index} className="flex items-center justify-center">
                                            {
                                                item.action ? 
                                                <View className="m-4 py-1.5 px-2">
                                                    <Button testID="table-action" title={item.text} color='blue' onPress={item.action} />
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