import { Parser } from "@dbml/core";

export function dbmlToDiagram(dbml: string) {
  const parser = new Parser();

  const parsed = parser.parse(dbml, "dbml");
  const schema = parsed.schemas[0];

  const nodes = schema.tables.map((table: any, index: number) => ({
    id: table.name,
    type: "custom",
    position: { x: index * 420, y: 100 },
    data: {
      tableName: table.name,
      columns: table.fields.map((f: any) => ({
        name: f.name,
        dataType: f.type?.type_name || "unknown",
        constraint: f.pk
          ? "PK"
          : f.unique
          ? "UNIQUE"
          : f.not_null
          ? "NOT NULL"
          : "",
      })),
    },
  }));

  const edges = schema.refs.map((ref: any, index: number) => {
    const from = ref.endpoints[0];
    const to = ref.endpoints[1];

    return {
      id: `e-${index}`,
      source: from.tableName,
      target: to.tableName,
      animated: true,
      type: "smoothstep",
    };
  });

  return { nodes, edges };
}
