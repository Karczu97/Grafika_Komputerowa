
class Sphere {
    constructor(radius,orbit_radius,texture,texture_vertecies,
                pos_x = 0,pos_z = 0,pos_y = 0,
                negate_normals = false, step_elevation = 90/30,step_angle = 360/18) {
        this.radius = radius;
        this.orbit_radius = orbit_radius;
        this.texture = texture;
        this.texture_vertecies = texture_vertecies;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.pos_z = pos_z;
        this.rotation_angle = 0;
        this.step_elevation = step_elevation;
        this.step_angle = step_angle;
        if (negate_normals) this.negate_normals = -1;
        else this.negate_normals = 1;

        this.vertex_position_buffer = gl.createBuffer(); //Stworzenie tablicy w pamieci karty graficznej
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.triangleVertecies()), gl.STATIC_DRAW);
        this.vertex_position_buffer.itemSize = 3; //zdefiniowanie liczby współrzednych per wierzchołek
        this.vertex_position_buffer.numItems = this.triangleVertecies().length / (this.vertex_position_buffer.itemSize * 3); //Zdefiniowanie liczby punktów w naszym buforze

        this.vertex_color_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_color_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorVertecies()), gl.STATIC_DRAW);
        this.vertex_color_buffer.itemSize = 3;
        this.vertex_color_buffer.numItems = this.colorVertecies().length / (this.vertex_color_buffer.itemSize * 3);

        this.vertex_coords_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_coords_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureVertecies()), gl.STATIC_DRAW);
        this.vertex_coords_buffer.itemSize = 2;
        this.vertex_coords_buffer.numItems = this.textureVertecies().length/ (this.vertex_coords_buffer.itemSize * 3);

        this.vertex_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalVertecies()), gl.STATIC_DRAW);
        this.vertex_normal_buffer.itemSize = 3;
        this.vertex_normal_buffer.numItems = this.normalVertecies().length/ (this.vertex_normal_buffer.itemSize * 3);
    }
    triangleVertecies() {
        let vertexes = [];
        for(let elevation=-90; elevation< 90; elevation+= this.step_elevation) {
            let radius_xz = this.radius*Math.cos(elevation*Math.PI/180);
            let radius_y  = this.radius*Math.sin(elevation*Math.PI/180);

            let radius_xz2 = this.radius*Math.cos((elevation+this.step_elevation)*Math.PI/180);
            let radius_y2  = this.radius*Math.sin((elevation+this.step_elevation)*Math.PI/180);

            for(let angle = 0; angle < 360; angle+= this.step_angle) {

                let px1 = radius_xz*Math.cos(angle*Math.PI/180);
                let py1 = radius_y;
                let pz1 = radius_xz*Math.sin(angle*Math.PI/180);

                let px2 = radius_xz*Math.cos((angle+this.step_angle)*Math.PI/180);
                let py2 = radius_y;
                let pz2 = radius_xz*Math.sin((angle+this.step_angle)*Math.PI/180);

                let px3 = radius_xz2*Math.cos(angle*Math.PI/180);
                let py3 = radius_y2;
                let pz3 = radius_xz2*Math.sin(angle*Math.PI/180);

                let px4 = radius_xz2*Math.cos((angle+this.step_angle)*Math.PI/180);
                let py4 = radius_y2;
                let pz4 = radius_xz2*Math.sin((angle+this.step_angle)*Math.PI/180);

                vertexes.push(...createRect2(
                    px1 + this.pos_x,py1 + this.pos_y,pz1 + this.pos_z,
                    px2 + this.pos_x,py2 + this.pos_y,pz2 + this.pos_z,
                    px3 + this.pos_x,py3 + this.pos_y,pz3 + this.pos_z,
                    px4 + this.pos_x,py4 + this.pos_y,pz4 + this.pos_z));
            }
        }
        return vertexes;
    }
    colorVertecies() {
        let color_vertecies = [];
        for(let elevation=-90; elevation< 90; elevation+= this.step_elevation) {
            for(let angle = 0; angle < 360; angle+= this.step_angle) {
                color_vertecies.push(...createRectColor(0.0,0.0,0.0));
            }
        }
        return color_vertecies;
    }
    textureVertecies() {
        return this.texture_vertecies;
    }
    normalVertecies() {
        let normals = [];
        for(let elevation=-90; elevation< 90; elevation+= this.step_elevation) {
            let radius_xz = this.radius*Math.cos(elevation*Math.PI/180);
            let radius_y  = this.radius*Math.sin(elevation*Math.PI/180);

            let radius_xz2 = this.radius*Math.cos((elevation+this.step_elevation)*Math.PI/180);
            let radius_y2  = this.radius*Math.sin((elevation+this.step_elevation)*Math.PI/180);

            for(let angle = 0; angle < 360; angle+= this.step_angle) {

                let px1 = radius_xz*Math.cos(angle*Math.PI/180);
                let py1 = radius_y;
                let pz1 = radius_xz*Math.sin(angle*Math.PI/180);

                let px2 = radius_xz*Math.cos((angle+this.step_angle)*Math.PI/180);
                let py2 = radius_y;
                let pz2 = radius_xz*Math.sin((angle+this.step_angle)*Math.PI/180);

                let px3 = radius_xz2*Math.cos(angle*Math.PI/180);
                let py3 = radius_y2;
                let pz3 = radius_xz2*Math.sin(angle*Math.PI/180);

                let px4 = radius_xz2*Math.cos((angle+this.step_angle)*Math.PI/180);
                let py4 = radius_y2;
                let pz4 = radius_xz2*Math.sin((angle+this.step_angle)*Math.PI/180);

                let p1 = Math.sqrt(px1*px1+py1*py1+pz1*pz1)
                let p2 = Math.sqrt(px2*px2+py2*py2+pz2*pz2)
                let p3 = Math.sqrt(px3*px3+py3*py3+pz3*pz3)
                let p4 = Math.sqrt(px4*px4+py4*py4+pz4*pz4)

                px1 /= this.negate_normals*p1
                py1 /= this.negate_normals*p1
                pz1 /= this.negate_normals*p1

                px2 /= this.negate_normals*p2
                py2 /= this.negate_normals*p2
                pz2 /= this.negate_normals*p2

                px3 /= this.negate_normals*p3
                py3 /= this.negate_normals*p3
                pz3 /= this.negate_normals*p3

                px4 /= this.negate_normals*p4
                py4 /= this.negate_normals*p4
                pz4 /= this.negate_normals*p4

                normals.push(...createRect2(px1,py1,pz1,px2,py2,pz2,px3,py3,pz3,px4,py4,pz4));
            }
        }
        return normals;
    }
    PositionBuffer() {
        return this.vertex_position_buffer;
    }
    ColorBuffer() {
        return this.vertex_color_buffer;
    }
    TextureBuffer() {
        return this.vertex_coords_buffer;
    }
    NormalsBuffer() {
        return this.vertex_normal_buffer;
    }
    TextureFileBuffer() {
        let texture_buffer = gl.createTexture();
        let texture_img = new Image();
        texture_img.onload = function() { //Wykonanie kodu automatycznie po załadowaniu obrazka
            gl.bindTexture(gl.TEXTURE_2D, texture_buffer);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture_img); //Faktyczne załadowanie danych obrazu do pamieci karty graficznej
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Ustawienie parametrów próbkowania tekstury
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        texture_img.src=this.texture;
        return texture_buffer;
    }
    changePosition(val_x,val_z,new_middle_x = 0,new_middle_z = 0) {
        this.pos_x = val_x + new_middle_x;
        this.pos_z = val_z + new_middle_z;
    }
    getPosX() {
        return this.pos_x;
    }
    getPosZ() {
        return this.pos_z;
    }
    setRotationAngle(rot_angle) {
        this.rotation_angle = rot_angle;
    }
    getRotationAngle() {
        return this.rotation_angle;
    }
    orbitRadius() {
        return this.orbit_radius;
    }
}