import React, {useState, useEffect} from 'react'; 
import {View, StyleSheet} from 'react-native'; 
import { 
  getGridColumns, 
  listenForOrientationChange, 
  getAdaptivePadding, 
  isTablet, 
} from '../utils/responsive'; 
import {theme} from '../styles/theme'; 
 
const ResponsiveGrid = ({ 
  data = [], 
  renderItem, 
  numColumns, 
  spacing = theme.spacing.sm, 
  contentContainerStyle, 
}) => { 
  const [columns, setColumns] = useState(numColumns || getGridColumns()); 
   
  useEffect(() => { 
    // Listen for orientation changes 
    const subscription = listenForOrientationChange(() => { 
      setColumns(numColumns || getGridColumns()); 
    }); 
 
    return () => subscription?.remove(); 
  }, [numColumns]); 
 
  const renderRow = (rowData, rowIndex) => { 
    return ( 
      <View key={rowIndex} style={[styles.row, {marginHorizontal: -spacing/2}]}> 
        {rowData.map((item, itemIndex) => { 
          if (!item) { 
            // Empty placeholder for incomplete rows 
            return <View key={itemIndex} style={[styles.item, {flex: 1}]} />; 
          } 
           
          return ( 
            <View 
              key={item.id || itemIndex} 
              style={[ 
                styles.item, 
                { 
                  flex: 1, 
                  marginHorizontal: spacing / 2, 
                  marginBottom: spacing, 
                }, 
              ]}> 
              {renderItem(item, itemIndex)} 
            </View> 
          ); 
        })} 
      </View> 
    ); 
  }; 
 
  // Group data into rows 
  const groupedData = []; 
  for (let i = 0; i < data.length; i += columns) { 
    const row = data.slice(i, i + columns); 
    // Fill incomplete rows with null 
    while (row.length < columns) { 
      row.push(null); 
    } 
    groupedData.push(row); 
  } 
 
  return ( 
    <View style={[styles.container, contentContainerStyle]}> 
      {groupedData.map((rowData, rowIndex) => renderRow(rowData, rowIndex))} 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    paddingHorizontal: getAdaptivePadding(), 
  }, 
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  }, 
  item: { 
    // Base item styles 
  }, 
}); 
 
export default ResponsiveGrid;