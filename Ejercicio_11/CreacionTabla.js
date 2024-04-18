
        //Aqui se le envia el csv para que d3 lo lea y lo muestre en la tabla
        d3.csv("Paises.csv").then(function(data) {
            var table = d3.select("#TablaCiudades");
            var thead = table.append("thead");
            var tbody = table.append("tbody");

            thead.append("tr")
                .selectAll("th")
                .data(d3.keys(data[0]))
                .enter()
                .append("th")
                .text(function(d) { return d; });

            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            var cells = rows.selectAll("td")
                .data(function(row) {
                    return d3.keys(data[0]).map(function(column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                .text(function(d) { return d.value; });
        });
